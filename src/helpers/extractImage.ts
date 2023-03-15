export default function extractImage(fileInfo: any) {
    if (!fileInfo) return null
    const { name, uri } = fileInfo

    return `${uri}/${name}`;
}