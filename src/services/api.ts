const URI = "http://localhost:3000/api/v1/task"

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    createdAt: string;
}

interface AddTask {
    title: string;
    description: string;
    dueDate: string;
}

interface FetchApiResponse {
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

interface AddReturn {
    success: string;
    message: string;
    result: Task;
}

interface DelReturn {
    success: string;
    error?: string;
    message?: string;
}

export const fetchTasks = async (): Promise<FetchReturn> => {
    try {
        const response = await fetch(URI);

        if (!response.ok) {
            throw new Error('Failed fetching task');
        }

        const data: FetchApiResponse = await response.json();
        return data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addTask = async (bodyReq: AddTask): Promise<AddReturn> => {
    try {
        const body = JSON.stringify(bodyReq);

        const response = await fetch(URI + "/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        const resp = await response.json();
        return resp;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const editTask = async (id: string, bodyReq: AddTask): Promise<AddReturn> => {
    try {
        const body = JSON.stringify(bodyReq);

        const response = await fetch(URI + "/edit/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body
        });

        const resp = await response.json();
        return resp;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const delTask = async (id: string): Promise<DelReturn> => {
    try {
        const response = await fetch(URI + "/del/" + id, {
            method: "DELETE",
        });

        const resp = await response.json();

        return resp;
    } catch (error) {
        console.error(error);
        throw error;
    }
}