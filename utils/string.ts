import { newsmediaPressUrl, newsmediaStoriesUrl, researchBlogsUrl, researchPublicationsUrl } from './urls'

export function convertStringToArray(input: string) {
  // Split the input string into lines
  let lines = input.split('\r\n')

  // Map each line to an object
  let result = lines.map((line) => {
    // Split each line into category and value
    let [category, value] = line.split(',')

    // Return the object with the desired structure
    return { value: category, link: '/' + value }
  })

  return result
}

export function convertToTitleCase(str: any) {
  return str
    .split('-') // Split the string by hyphens
    .map((word: string) => {
      if (word.toLowerCase() === 'and') {
        return '&' // Convert 'and' to '&'
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1) // Capitalize other words
      }
    })
    .join(' ')
    .toUpperCase() // Join the words with spaces
}

// Newsletter Title Formatting
export function convertRomanToNumber(roman: string) {
  const romanNumerals: any = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let result = 0
  for (let i = 0; i < roman.length; i++) {
    if (i > 0 && romanNumerals[roman[i]] > romanNumerals[roman[i - 1]]) {
      result += romanNumerals[roman[i]] - 2 * romanNumerals[roman[i - 1]]
    } else {
      result += romanNumerals[roman[i]]
    }
  }
  return result
}

export function convertTitleToNewsLetterFormat(title: string) {
  let list: string[] = []
  // const regex = /^Issue No\. (\d+): Quarter ([IVX]+)\s*(\d{4})$/
  const regex = /^Issue No\. (\d+): Quarter ([IVX]+)[\s–-]+(\d{4})$/
  const match = regex.exec(title)

  if (match) {
    const issueNumber = match[1]
    let quarter = match[2]
    const year = match[3]

    // Convert Roman numeral to number
    let q = convertRomanToNumber(quarter)

    // Create the custom format string and add to resultList
    list = [`Issue No. ${issueNumber}`, `Q${q} ${year}`]
  }
  return list
}

// Generates years array for selection filters for blogs, newsletters etc
export function generateYearOptions() {
  const startYear = 2014
  const currentYear = new Date().getFullYear()
  const years = []

  // Generate an array of years from startYear to currentYear
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year)
  }
  return years
}

// Blogs: returns nodes that have no parent ( no parent nodes ) & nodes with parent & its children
export const organizeData = (data: any) => {
  const groupedData: any = {}
  const parentsWithChildren = new Set()
  const noParentNodes: any = []

  // Identify all parents with children
  data.forEach((edge: any) => {
    const { parent } = edge.node
    if (parent) {
      parentsWithChildren.add(parent.node.name)
    }
  })

  // Group data and handle standalone nodes
  data.forEach((edge: any) => {
    const { name, parent } = edge.node

    if (parent) {
      const parentName = parent.node.name
      if (!groupedData[parentName]) {
        groupedData[parentName] = []
      }
      groupedData[parentName].push(name)
    } else {
      if (!parentsWithChildren.has(name)) {
        noParentNodes.push(name)
      }
    }
  })

  return { groupedData, noParentNodes }
}

export const getNodesWithoutParents = (data: any) => {
  return data.filter((item: any) => item.node.parent === null).map((item: any) => item.node.name)
}

// Search Page
export function convertToUrl(selectedNavItem: string, navItems: any, slug: string) {
  if (selectedNavItem == navItems[1]) {
    return researchBlogsUrl + slug
  } else if (selectedNavItem == navItems[2]) {
    return researchPublicationsUrl + slug
  } else if (selectedNavItem == navItems[3]) {
    return newsmediaPressUrl + slug
  } else if (selectedNavItem == navItems[4]) {
    return newsmediaStoriesUrl + slug
  }
}

// Search Page -For styling of different badges with diff colors
export function convertToPostType(selectedNavItem: string, navItems: any) {
  if (selectedNavItem == navItems[1]) {
    return 'blog'
  } else if (selectedNavItem == navItems[2]) {
    return 'karandaazresearch'
  } else if (selectedNavItem == navItems[3]) {
    return 'pressrelease'
  } else if (selectedNavItem == navItems[4]) {
    return 'stories'
  }
}

// for headings - converts all to lowercase & capitalises first letters of words
export function capitalizeFirstLetters(str: string) {
  const prepositions = [
    'in',
    'on',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'the',
  ]

  return str
    .split(' ')
    .map((word, index) => {
      console.log('Word', word)
      if (word === word.toUpperCase()) {
        console.log('Word', word)
        return word
      }
      if (prepositions.includes(word.toLowerCase()) && index !== 0 && index !== str.split(' ').length - 1) {
        return word.toLowerCase()
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
    })
    .join(' ')
}

// cut string acc to number given & adds ...
export function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...'
  } else {
    return str
  }
}
