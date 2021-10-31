export const sortArray = (tempData) => {
  return tempData.sort((a, b) => {
    if (a.firstName < b.firstName) return -1
    return a.firstName > b.firstName ? 1 : 0
  })
}
