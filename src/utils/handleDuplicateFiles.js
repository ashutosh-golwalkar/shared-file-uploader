
const handleDuplicateFiles = (currentFiles, fileName) => {

    const fileSplit = fileName.split('.');
    const extension = '.' + fileSplit.pop();
    const name = fileSplit.join('');
    let newName = name;
    let i = 1;
    while(currentFiles.includes(newName + extension)) {
        newName = `${name}(${i})`;
        i++;
    }
    return newName + extension;
}

module.exports = handleDuplicateFiles;