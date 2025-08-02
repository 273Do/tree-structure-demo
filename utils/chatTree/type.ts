type RoleObj = "user" | "assistant";

type MessageObj = {
  id: string;
  message: string;
  role: RoleObj;
  createdAt: Date;
  parentId?: string;
};

export { type MessageObj, type RoleObj };
