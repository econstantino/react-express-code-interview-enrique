import express, { Request, Response } from 'express';

const router = express.Router();

const DEFAULT_PAGE_SIZE = 50;
const sortableKeys = [
  'name',
  'id'
];

type User = {
  name: string,
  id: number,
}

type GetUsersQuery = {
  sort_by?: string,
  size?: number,
  page?: string,
};

type GetUsersResponse = {
  data: User[],
  totalCount: number,
  previous?: string,
  next?: string,
};

const users = [{
  name: 'Jorn',
  id: 0,
}, {
  name: 'Markus',
  id: 3,
}, {
  name: 'Andrew',
  id: 2,
}, {
  name: 'Ori',
  id: 4,
}, {
  name: 'Mike',
  id: 1,
}];

router.get('/', (req: Request, res: Response) => {
  const {
    sort_by,
    size = DEFAULT_PAGE_SIZE,
    page = '1',
  } = req.query as GetUsersQuery;

  const startIndex = (parseInt(page) - 1) * size;
  const endIndex = parseInt(page) * size;

  // Getting data from data source
  const totalUsers = [...users] as User[]

  // Sorting section
  // First check if sort_by is being sent
  if(sort_by) {
    // separate the field and the order I.E. name_DESC
    const [sortField, order] = sort_by.split('_');

    // Check if sort_by value exists and order is correct
    // Sortable keys is added to a different array in case of a scenario where we don't want to make all fields sortable
    // Otherwise we could check for the keyof User type
    if (sortableKeys.includes(sortField) &&
      order &&
      ['asc', 'desc'].includes(order.toLowerCase())
    ){
      order.toLowerCase() === 'asc' ? 
      totalUsers.sort((a,b) => 
          a[sortField as keyof User].toLocaleString()
            .localeCompare(b[sortField as keyof User].toLocaleString()
        ))
        :
        totalUsers.sort((a,b) => 
          b[sortField as keyof User].toLocaleString()
            .localeCompare(a[sortField as keyof User].toLocaleString()
        ));
    }
  }

  // Pagination section
  // Based on the full results return the total number of results and slice the requested amount
  const results = {
    data: totalUsers.slice(startIndex, endIndex),
    totalCount: totalUsers.length,
  } as GetUsersResponse;

  // URL would need to get appended to the previous and next property
  if(startIndex > 0) {
    const previousPage = parseInt(page) - 1;
    results.previous = `?sort_by=${sort_by}&size=${size}&page=${previousPage}`
  }

  if(endIndex < results.totalCount) {
    const nextPage = parseInt(page) + 1;
    results.next = `?sort_by=${sort_by}&size=${size}&page=${nextPage}`;
  }

  res.send(results);

  // As a general note depending on our source of data we might be able to optimize sorting and pagination
  // using the tools provided by our data layer, be Mongo, GraphQL, or a SQL Query.
  
});

export default router;