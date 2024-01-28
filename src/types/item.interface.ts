export interface Item {
  title?: string | null;
  law: string;
  laws?: string[] | null;
  corollary?: Corollary | null;
  corollaries?: Corollary[] | null;
}

export interface Corollary {
  title?: string | null;
  law: string;
}
