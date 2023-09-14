// Type: Model

interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    status: "todo" | "in-progress" | "done";
    createdAt: Date;
    updatedAt: Date;
    completedAt?: Date;
    deadline?: Date;
}