import linktree from '_data/linktree.json';

export type LinktreeItem = {
  readonly url: string;
  readonly title: string;
  readonly backgroundColor?: string;
  readonly textColor?: string;
};

export type LinktreeCategoryItem = {
  readonly category: string;
  readonly items: LinktreeItem[];
};

export default linktree as unknown as LinktreeCategoryItem[];
