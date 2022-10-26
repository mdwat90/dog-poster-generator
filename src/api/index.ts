export const getBreeds = async () => {
        const response = await fetch("https://dog.ceo/api/breeds/list/all").then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error('Oops! Something went wrong fetching breeds...')
        }
        ).catch(err => { throw err });
        return response;
};

export const getSubBreeds = async (breed: string) => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/list`).then(resp => {
        if (resp.ok) {
            return resp.json();
        }
        throw new Error('Oops! Something went wrong fetching sub breeds...')
    }
    ).catch(err => { throw err });

    return response;
}

export const getPhotos = async (queries: string[]) => {
    let promises = queries.map(query => 
        fetch(query).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error('Oops! Something went wrong fetching your photos...')
        }
        ).catch(err => { throw err }));
    
    return Promise.all(promises).then(results => results).catch(err => { throw err });
}