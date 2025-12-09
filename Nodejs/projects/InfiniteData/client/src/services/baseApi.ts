export async function get(url: string){
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error while Get: "+ url , error);
            throw error;
        }
}