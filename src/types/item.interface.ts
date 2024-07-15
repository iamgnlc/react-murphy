import { type SizeProps } from ".";

export interface ItemProps extends CorollaryProps {
  laws?: string[] | null;
  corollary?: CorollaryProps | null;
  corollaries?: CorollaryProps[] | null;
}

export interface CorollaryProps {
  title?: string | null;
  law: string;
}

export interface LawProps {
  titleTag?: "h1" | "h2" | "h3";
  item: ItemProps;
  size?: { [key in string]: SizeProps["size"] };
}
