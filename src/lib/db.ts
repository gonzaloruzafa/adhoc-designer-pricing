import { supabase, isSupabaseConfigured } from "./supabase";
import { getDeviceId, generateShareSlug } from "./device";
import type { QuoteResult, Quote, CalculatedItem } from "@/types";

export async function saveQuote(
  result: QuoteResult,
  email?: string | null
): Promise<{ shareSlug: string; quoteId: string } | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Supabase not configured, skipping save");
    // En modo desarrollo sin Supabase, generar un shareSlug local
    return {
      shareSlug: generateShareSlug(),
      quoteId: generateShareSlug(),
    };
  }

  const deviceId = getDeviceId();
  const shareSlug = generateShareSlug();

  try {
    const { data, error } = await supabase
      .from("quotes")
      .insert({
        device_id: deviceId,
        email: email || null,
        client_type: result.settings.clientType,
        back_and_forth: result.settings.backAndForth,
        urgency: result.settings.urgency,
        items: result.items as unknown as Record<string, unknown>[],
        total_min: result.totalMin,
        total_max: result.totalMax,
        share_slug: shareSlug,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Error saving quote:", error);
      return null;
    }

    // Si hay email, guardar/actualizar lead
    if (email) {
      await saveLead(email, data.id);
    }

    return {
      shareSlug,
      quoteId: data.id,
    };
  } catch (err) {
    console.error("Error saving quote:", err);
    return null;
  }
}

export async function saveLead(email: string, quoteId?: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Supabase not configured, skipping lead save");
    return true;
  }

  const deviceId = getDeviceId();

  try {
    const { error } = await supabase
      .from("leads")
      .upsert(
        {
          email: email.toLowerCase().trim(),
          device_id: deviceId,
          last_quote_id: quoteId || null,
        },
        {
          onConflict: "email",
        }
      );

    if (error) {
      console.error("Error saving lead:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error saving lead:", err);
    return false;
  }
}

export async function getQuoteByShareSlug(shareSlug: string): Promise<Quote | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Supabase not configured, cannot load shared quote");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("share_slug", shareSlug)
      .single();

    if (error) {
      console.error("Error fetching quote:", error);
      return null;
    }

    return data as Quote;
  } catch (err) {
    console.error("Error fetching quote:", err);
    return null;
  }
}

export async function updateQuoteEmail(quoteId: string, email: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Supabase not configured, skipping email update");
    return true;
  }

  try {
    const { error } = await supabase
      .from("quotes")
      .update({ email: email.toLowerCase().trim() })
      .eq("id", quoteId);

    if (error) {
      console.error("Error updating quote email:", error);
      return false;
    }

    await saveLead(email, quoteId);
    return true;
  } catch (err) {
    console.error("Error updating quote email:", err);
    return false;
  }
}
