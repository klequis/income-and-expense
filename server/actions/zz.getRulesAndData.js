import fs from 'fs'
import path from 'path'

const getFiles = async (relativePath, extension) => {
  const dirToRead = path.join(__dirname, relativePath)
  const allFiles = await fs.promises.readdir(dirToRead)
  const allFullPathFiles = allFiles.map(file => path.join(dirToRead, file))
  return allFullPathFiles.filter(file => path.extname(file) === extension)
}

const createFileObjects = async (relativePath, extension) => {
  const files = await getFiles(relativePath, extension)
  return files.map(file => {
    return {
      fullPath: file,
      basename: path.basename(file, extension)
    }
  })
}

const getRulesAndData = async () => {
  const rfs = await createFileObjects('../rules', '.json')
  const dfs = await createFileObjects('../data', '.csv')
  return rfs.map(rf => ({
    ruleFile: rf,
    dataFile: dfs.find(df => rf.basename === df.basename)
  }))
}

export default getRulesAndData
