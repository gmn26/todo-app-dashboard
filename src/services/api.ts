const URI = "http://localhost:3000/api/v1/task"

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    result: {
        tasks: Task[];
        totalTask: number;
    };
}

interface FetchReturn {
    tasks: Task[];
    totalTask: number;
}

export const fetchTasks = async (): Promise<FetchReturn> => {
    try {
        const response = await fetch(URI);

        if (!response.ok) {
            throw new Error('Failed fetching task');
        }

        const data: ApiResponse = await response.json();
        return data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}