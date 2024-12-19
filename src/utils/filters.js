//ici les fonctions pour filtrer + le combine filters
// mention (par includes()) - region (par includes()) - ville (par includes()) - alternance possible (check true) - distanciel (check true)
export const filterIncludes = (property) => (search) => (obj) => {
    if (typeof property !== 'string' || !obj.hasOwnProperty(property)) {
      throw new Error(`Invalid property: ${property}`);
    }
    if (typeof search !== 'string') {
      throw new Error(`Invalid search term: ${search}`);
    }
  
    const propertyValue = obj[property];
    if (typeof propertyValue !== 'string') {
      throw new Error(`The value of property ${property} is not a string.`);
    }
  
    return propertyValue.toLowerCase().includes(search.toLowerCase());
  };

  export const filterBoolean = (property) => (search) => (obj) => {
    if (typeof property !== 'string') {
        throw new Error(`Invalid property: ${property}`);
    }

    if (!obj.hasOwnProperty(property)) {
        return true;
    }

    const propertyValue = obj[property];

    if (typeof propertyValue !== 'boolean') {
        return true;
    }
    return propertyValue === search;
};





export const combineFilters = (...filters) => (object) => {
    return filters.reduce((filter)=>filter(object),[])
  }