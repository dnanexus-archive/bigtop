export const fetchData = (url) => ({type: "FETCH_FILE", successAction: "RECEIVED_DATA", url});
export const fetchChromosomes = (url) => ({type: "FETCH_FILE", successAction: "RECEIVED_CHR", url});
export const fetchCytobands = (url) => ({type: "FETCH_FILE", successAction: "RECEIVED_CYTO", url});
