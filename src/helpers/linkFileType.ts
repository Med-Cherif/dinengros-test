import path from 'path-browserify';

export const LinkFileType = ({ linkPath }) => {

  if (!linkPath) return ''

  const ext = path.extname(linkPath);
  let fileType = '';

  switch (ext) {
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
      fileType = 'image';
      break;
    case '.mp4':
    case '.avi':
    case '.wmv':
    case '.mov':
      fileType = 'video';
      break;
    case '.pdf':
      fileType = 'pdf';
      break;
    default:
      fileType = 'unknown';
  }

  return fileType;
};
