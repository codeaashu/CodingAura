import dotenv from 'dotenv';
dotenv.config();


export const graphQL = async ({query, variables}: {
    query: string;
    variables: Record<string, any>;
}) => {
    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                Accept: 'application/vnd.github+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query, variables})
        });

        if(!response.ok){
            throw new Error(`req failed ${response.status}`)
        }
        
        const data = await response.json();

        return data.data;
    } catch (error) {
        console.log(error)
    }
}