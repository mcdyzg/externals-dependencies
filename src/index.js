import fs from 'fs'
export default function (arr = []){
    var packageJson,externals = {};
    try {
        var packageJsonString = fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf8');
        packageJson = JSON.parse(packageJsonString);
    } catch (e){
        throw 'can not find package.json'
    }
    var sections = ['dependencies'].concat(arr);
    sections = new Set(sections)

    var deps = {};
    sections.forEach(function(section){
        Object.keys(packageJson[section] || {}).forEach(function(dep){
            externals[dep] = 'commonjs ' + dep;
        });
    });
    return externals
}
