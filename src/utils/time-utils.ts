export const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const runWithTimeOut = async<T1, T2 extends any[]> (task: (() => Promise<T1>) | ((...args: T2) => Promise<T1>), 
                                                           ms: number,
                                                           para?: T2) => {
    const timedOutTask = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Task timed out")), ms));
    
    if (task.length == 0) {
        return Promise.race([task(), timedOutTask]);
    }
    else {
        const taskWithPara = task as (...args: T2) => Promise<T1>;
        return Promise.race([taskWithPara(...para!), timedOutTask]);
    }
}