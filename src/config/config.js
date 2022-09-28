import axios from 'axios';

export const API = axios.create({
   baseURL: 'https://api.ziq.studentdumbways.my.id/api/v1',

});

export const setToken = (token) => {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
};

export const fileURL =
  'https://res.cloudinary.com/nuraskiah/image/upload/literature/files';

export const coverURL =
  'https://res.cloudinary.com/nuraskiah/image/upload/w_540,c_scale/literature/files';

export const downloadURL =
  'https://res.cloudinary.com/nuraskiah/image/upload/fl_attachment/literature/files';
