export const getNavigationData = (categories: any) => {
    return categories.map(cat => ({
      icon: cat.image,
      title: cat.name,
      href: `/categories/${cat.id}`,
      menuComponent: 'MegaMenu1',
      menuData: {
        categories: cat.children?.map(subCat => ({
          title: subCat.name,
          href: `/categories/${subCat.id}`,
          icon: subCat.image,
          subCategories: subCat?.children.map(childCat => ({
              title: childCat.name,
              href: `/categories/${childCat.id}`,
              icon: childCat.image,
          }))
        }))
      }
    }))
}