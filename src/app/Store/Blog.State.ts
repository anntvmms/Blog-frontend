import { BlogModel } from './Blog.Model';

export const blogState: BlogModel = {
  list: [],
  errormessage: '',
  empobj: {
    id: 0,
    newsTitle: '',
    doj: new Date(),
    detailsContent: '',
    category: '',
  },
};
