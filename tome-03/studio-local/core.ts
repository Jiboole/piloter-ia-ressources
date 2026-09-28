export type Status =
  | 'NOUVEAU'
  | 'A_RELIRE'
  | 'APPROUVE'
  | 'REFUSE';
export type Brief = {
  id: string;
  commerce: string;
  objectif: string;
  revision: number;
  status: Status;
};
export type Event = {
  action:
    | 'creer'
    | 'soumettre'
    | 'approuver'
    | 'refuser'
    | 'reviser';
  id: string;
  revision: number;
  by: string;
  at: string;
  commerce?: string;
  objectif?: string;
  reason?: string;
};

function demand(
  ok: unknown,
  message: string
): asserts ok {
  if (!ok) throw new Error(message);
}
function nonempty(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

// Le journal est rejoué : les règles sont les mêmes
// à la saisie et lors du chargement du stockage.
export function replay(
  events: readonly Event[]
): Brief[] {
  const rows = new Map<string, Brief>();
  for (const e of events) {
    demand(
      e && typeof e === 'object',
      'Evenement invalide'
    );
    demand(
      nonempty(e.id) && nonempty(e.by),
      'Identite manquante'
    );
    demand(
      nonempty(e.at) && Number.isFinite(Date.parse(e.at)),
      'Date invalide'
    );
    demand(
      Number.isInteger(e.revision) && e.revision > 0,
      'Revision invalide'
    );
    const old = rows.get(e.id);
    if (e.action === 'creer') {
      demand(!old, 'Identifiant deja utilise');
      demand(
        e.revision === 1,
        'Creation attendue en revision 1'
      );
      demand(
        nonempty(e.commerce) && nonempty(e.objectif),
        'Commerce et objectif requis'
      );
      rows.set(e.id, {
        id: e.id,
        commerce: e.commerce.trim(),
        objectif: e.objectif.trim(),
        revision: 1,
        status: 'NOUVEAU'
      });
      continue;
    }
    demand(old, 'Dossier introuvable');
    demand(
      e.revision === old.revision,
      'Revision perimee'
    );
    const next = { ...old };
    if (e.action === 'soumettre') {
      demand(
        old.status === 'NOUVEAU',
        'Dossier deja soumis'
      );
      next.status = 'A_RELIRE';
    } else if (
      e.action === 'approuver' ||
      e.action === 'refuser'
    ) {
      demand(
        old.status === 'A_RELIRE',
        'Relecture requise'
      );
      demand(nonempty(e.reason), 'Motif requis');
      next.status =
        e.action === 'approuver' ? 'APPROUVE' : 'REFUSE';
    } else if (e.action === 'reviser') {
      demand(nonempty(e.objectif), 'Objectif requis');
      demand(
        e.objectif.trim() !== old.objectif,
        'Objectif inchange'
      );
      next.objectif = e.objectif.trim();
      next.revision += 1;
      next.status = 'A_RELIRE';
    } else {
      throw new Error('Action inconnue');
    }
    rows.set(e.id, next);
  }
  return [...rows.values()];
}

export function append(
  events: readonly Event[],
  event: Event
): Event[] {
  const next = [...events, event];
  replay(next); // Refuser avant toute sauvegarde.
  return next;
}
export function encode(events: readonly Event[]): string {
  replay(events);
  return JSON.stringify({ schema: 1, events });
}
export function decode(raw: string): Event[] {
  const value: unknown = JSON.parse(raw);
  demand(
    value && typeof value === 'object',
    'Sauvegarde invalide'
  );
  const v = value as {
    schema?: unknown;
    events?: unknown;
  };
  demand(
    v.schema === 1 && Array.isArray(v.events),
    'Format inconnu'
  );
  // Le cast seul ne valide rien.
  // replay contrôle chaque événement.
  const events = v.events as Event[];
  replay(events);
  return events;
}

export function csv(events: readonly Event[]): string {
  const cell = (v: unknown) => {
    let s = String(v);
    // Limiter l'interprétation en formule par un tableur.
    if (/^[\s]*[=+@-]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const lines = [
    ['id', 'commerce', 'objectif', 'revision', 'statut'],
    ...replay(events).map((b) => [
      b.id,
      b.commerce,
      b.objectif,
      b.revision,
      b.status
    ])
  ];
  return (
    '\uFEFF' +
    lines
      .map((row) => row.map(cell).join(';'))
      .join('\r\n')
  );
}

// Compter les dossiers, pas les gestes de leur historique.
export function nextId(events: readonly Event[]): string {
  const ids = replay(events).map((row) => {
    const match = /^SL-(\d+)$/.exec(row.id);
    return match ? Number(match[1]) : 0;
  });
  const number = Math.max(0, ...ids) + 1;
  demand(
    Number.isSafeInteger(number),
    'Identifiant hors limite'
  );
  return 'SL-' + String(number).padStart(3, '0');
}

// Ne conserver que les champs utiles au geste demandé.
export function eventFor(
  action: Event['action'],
  id: string,
  revision: number,
  fields: {
    by: string;
    at: string;
    commerce: string;
    objectif: string;
    reason: string;
  }
): Event {
  const base = {
    action,
    id,
    revision,
    by: fields.by,
    at: fields.at
  };
  if (action === 'creer') {
    return {
      ...base,
      commerce: fields.commerce,
      objectif: fields.objectif
    };
  }
  if (action === 'reviser') {
    return { ...base, objectif: fields.objectif };
  }
  if (action === 'approuver' || action === 'refuser') {
    return { ...base, reason: fields.reason };
  }
  return base;
}
