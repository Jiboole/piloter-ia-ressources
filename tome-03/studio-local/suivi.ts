import { replay } from './core.ts';
import type { Event, Status } from './core.ts';

export type Bilan = {
  total: number;
  parStatut: Record<Status, number>;
};

export function suivi(events: readonly Event[]): Bilan {
  const dossiers = replay(events);
  const parStatut: Record<Status, number> = {
    NOUVEAU: 0,
    A_RELIRE: 0,
    APPROUVE: 0,
    REFUSE: 0
  };
  for (const dossier of dossiers) {
    parStatut[dossier.status] += 1;
  }
  return { total: dossiers.length, parStatut };
}
