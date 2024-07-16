import { Answer, CharacterResult } from "../interfaces";

const root: string = "https://rickandmortyapi.com/api/";

async function bringCharacters(): Promise<Answer> {
  try {
    let allCharacters: any[] = [];
    let currentPage: number = 1;
    let totalPages: number = 1; 

    
    while (currentPage <= totalPages) {
      const response: any = await fetch(`${root}character/?page=${currentPage}`);

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: Problem encountered retrieving data`
        );
      }

      const rawData: CharacterResult = await response.json();
      console.log(`Fetched page ${currentPage}`);
      
      
      allCharacters = [...allCharacters, ...rawData.results];
      totalPages = rawData.info.pages; 
      currentPage++;
    }

    const data: Answer = {
      message: "All data properly fetched",
      success: true,
      data: {
        info: {
          count: allCharacters.length,
          pages: totalPages,
          next: null, 
          prev: null
        },
        results: allCharacters
      },
    };

    return data;
  } catch (error: any) {
    const errorAnswer: Answer = {
      message: error,
      success: false,
      data: {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null
        },
        results: []
      },
    };

    return errorAnswer;
  }
}

export default bringCharacters;
