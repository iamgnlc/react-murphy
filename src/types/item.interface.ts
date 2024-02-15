export interface ItemProps {
  title?: string | null;
  law: string;
  laws?: string[] | null;
  corollary?: CorollaryProps | null;
  corollaries?: CorollaryProps[] | null;
}

export interface CorollaryProps {
  title?: string | null;
  law: string;
}
