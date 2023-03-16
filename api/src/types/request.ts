export type ItemCreateParams = {
  content: string;
  isDone: boolean;
};

export type ItemUpdateParams = {
  content?: string;
  isDone?: boolean;
};
