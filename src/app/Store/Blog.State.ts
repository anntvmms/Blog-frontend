import { BlogModel } from './Blog.Model';

export const blogState: BlogModel = {
  list: [],
  errormessage: '',
  blgobj: {
    id: 0,
    newsTitle: '',
    doj: new Date(),
    detailsContent: '',
    category: '',
  },
};
