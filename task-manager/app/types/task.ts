export type Task = {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_Progress' | 'completed';
  };
  