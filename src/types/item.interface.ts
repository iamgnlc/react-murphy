export interface IItem {
  title?: string | null;
  law: string;
  laws?: string[] | null;
  corollary?: ICorollary | null;
  corollaries?: ICorollary[] | null;
}

export interface ICorollary {
  title?: string | null;
  law: string;
}
