// import { createFsFromVolume, Volume } from 'memfs'
// import { runNpmCli } from 'npm-in-browser'
// import webpack from 'webpack'
import { transform } from 'sucrase'
// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import nodePolyfills from 'rollup-plugin-polyfill-node'
export async function createBuilder() {
    window.process = await import('process')
    const memfs = await import('memfs')
    const { runNpmCli } = await import('npm-in-browser')

    const rollup = await import('rollup').then((r) => r) //2.56.3
    const local = `rollup://core`

    // const memfsFSVolume = memfs.createFsFromVolume(new memfs.Volume())

    await runNpmCli(['install', 'react'], {
        fs: memfs.fs,
        cwd: '/home/web/app',
        stdout: (chunk) => {
            console.log('stdout', chunk)
        },
        stderr: (chunk) => {
            console.log('stderr', chunk)
        },
        timings: {
            start(name) {
                // console.log('START: ' + name)
            },
            end(name) {
                // console.log('END: ' + name)
            },
        },
    })

    //esbuild-wasm
    //
    const reactPkgJson = memfs.readFileSync('/home/web/app/node_modules/react/package.json', 'utf-8')

    console.log({ reactPkgJson })

    const code = `
        import * as React from 'react'
        console.log(React, 'yo')
    `
    //Creating our entry file with the user-submitted code
    memfs.fs.writeFileSync('/home/web/app/main.js', code)

    const DEFALUT_EXTENSIONS = ['.ts', '.tsx', '.js', '.mjs', '.json']
    class Resolver {
        constructor(
            fs,
            { extensions = DEFALUT_EXTENSIONS, searchDirectoryIndex = true, searchDirectoryPackage = false } = {},
        ) {
            this.extensions = extensions
            // always include id itself first
            if (!this.extensions.includes('')) {
                this.extensions.unshift('')
            }
            this.searchDirectoryIndex = searchDirectoryIndex
            this.searchDirectoryPackage = searchDirectoryPackage
        }
        async exists(id) {
            return memfs.fs
                .access(id)
                .then(() => true)
                .catch((_err) => false)
        }
        async resolveId(id) {
            // [id][ext]
            for (const ext of this.extensions) {
                const s = id + ext
                if (await this.exists(s)) {
                    return id + ext
                }
            }
            for (const ext of this.extensions) {
                const s = path.join(id, 'index' + ext)
                if (await this.exists(s)) {
                    return id + ext
                }
            }
            // [id]/index[ext]
            if (this.searchDirectoryIndex) {
                for (const ext of this.extensions) {
                    const s = path.join(id, 'index' + ext)
                    if (await this.exists(s)) {
                        return s
                    }
                }
            }
            // [id]/package.json#main
            if (this.searchDirectoryPackage) {
                const pkgPath = path.join(id, 'package.json')
                if (await this.exists(pkgPath)) {
                    return
                }
                const pkgStr = await memfs.fs.readFileSync(pkgPath)
                let json
                try {
                    json = JSON.parse(pkgStr.toString())
                } catch (err) {
                    console.warn(err)
                    // through parse error
                }
                if (json && json.module) {
                    return json.module
                }
                if (json && json.main) {
                    return json.main
                }
            }
        }
    }
    const resolver = new Resolver()

    let bundle = rollup.rollup({
        input: `/home/web/app/main.js`,
        plugins: [
            {
                name: 'memfs',
                async resolveId(source, importer) {
                    if (source.includes(local)) {
                        source = source.replace(`${local}`, '')
                    }

                    // console.log('importee', importee.replace(`${local}`, ''))
                    // console.log('importer', importer)
                    // return `${cleaned}`

                    if (importer && importer.startsWith('/') && source.startsWith('.')) {
                        const fullpath = importer ? path.resolve(path.dirname(importer), source) : source
                        const reslovedWithExt = await resolver.resolveId(fullpath)
                        return reslovedWithExt
                    }
                    return source
                },
                async load(id) {
                    if (id.indexOf(`/home/web/`) === 0) {
                        let data = memfs.fs.readFileSync(id, 'utf-8')
                        return data
                    } else {
                        try {
                            let fileText = memfs.fs.readFileSync(
                                `/home/web/app/node_modules/${id}/package.json`,
                                'utf-8',
                            )
                            let json = JSON.parse(fileText)
                            let mainURL = json.main
                            let mainFile = memfs.fs.readFileSync(`/home/web/app/node_modules/${id}/${mainURL}`, 'utf-8')

                            let content = mainFile

                            let tf = transform(content, {
                                transforms: ['jsx'],
                                preserveDynamicImport: true,
                                production: true,
                                jsxPragma: 'React.createElement',
                                jsxFragmentPragma: 'React.Fragment',
                            }).code

                            //
                            console.log(tf)
                            return tf
                        } catch (e) {
                            console.log(e)
                        }
                    }

                    return `
                    console.log('not found');
                    `
                    //rollup://core/
                    ///home/web/app/node_modules/rollup://core/home/web/app/main.js/package.json
                    // let data = memfs.readFileSync(`/home/web/app/node_modules/${id}/package.json`, 'utf-8')
                },
            },
        ],
    })

    let bdn = await bundle
    let parcel = await bdn.generate({
        output: { format: 'esm', dir: './dist' },
    })
    let rawOutputs = parcel.output
    console.log('[rawOutputs]', rawOutputs)
    let outputs = rawOutputs

    console.log(outputs)

    // import('webpackBrowser')

    // let path = {}

    // // resolves . and .. elements in a path array with directory names there
    // // must be no slashes or device names (c:\) in the array
    // // (so also no leading and trailing slashes - it does not distinguish
    // // relative and absolute paths)
    // function normalizeArray(parts, allowAboveRoot) {
    //     var res = []
    //     for (var i = 0; i < parts.length; i++) {
    //         var p = parts[i]

    //         // ignore empty parts
    //         if (!p || p === '.') continue

    //         if (p === '..') {
    //             if (res.length && res[res.length - 1] !== '..') {
    //                 res.pop()
    //             } else if (allowAboveRoot) {
    //                 res.push('..')
    //             }
    //         } else {
    //             res.push(p)
    //         }
    //     }

    //     return res
    // }

    // // Split a filename into [root, dir, basename, ext], unix version
    // // 'root' is just a slash, or nothing.
    // var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/

    // function posixSplitPath(filename) {
    //     return splitPathRe.exec(filename).slice(1)
    // }

    // path.resolve = function () {
    //     var resolvedPath = '',
    //         resolvedAbsolute = false

    //     for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    //         var path = i >= 0 ? arguments[i] : process.cwd()

    //         // Skip empty and invalid entries
    //         if (typeof path !== 'string') {
    //             throw new TypeError('Arguments to path.resolve must be strings')
    //         } else if (!path) {
    //             continue
    //         }

    //         resolvedPath = path + '/' + resolvedPath
    //         resolvedAbsolute = path[0] === '/'
    //     }

    //     // At this point the path should be resolved to a full absolute path, but
    //     // handle relative paths to be safe (might happen when process.cwd() fails)

    //     // Normalize the path
    //     resolvedPath = normalizeArray(resolvedPath.split('/'), !resolvedAbsolute).join('/')

    //     return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
    // }

    // path.dirname = (path) => {
    //     var result = posixSplitPath(path),
    //         root = result[0],
    //         dir = result[1]

    //     if (!root && !dir) {
    //         // No dirname whatsoever
    //         return '.'
    //     }

    //     if (dir) {
    //         // It has a dirname, strip trailing slash
    //         dir = dir.substr(0, dir.length - 1)
    //     }

    //     return root + dir
    // }
    // const memfsPlugin = (fs) => {
    //     const resolver = new Resolver(fs)
    //     return {
    //         name: 'memfs',
    //         async resolveId(source, importer) {
    //             // console.log("[memfs.resolveId]", source, importer);
    //             // resolve relative path;
    //             if (importer && importer.startsWith('/') && source.startsWith('.')) {
    //                 const fullpath = importer ? path.resolve(path.dirname(importer), source) : source
    //                 const reslovedWithExt = await resolver.resolveId(fullpath)
    //                 return reslovedWithExt
    //             }
    //             return source
    //         },
    //         async load(id) {
    //             const m = await memfs.fs.readFileSync(id, 'utf-8')
    //             return m
    //             // if (id.startsWith("/")) {
    //             //   const m = await fs.readFile(id, "utf-8");
    //             //   return m;
    //             // }
    //             // console.log("[memfs]", "skip", id);
    //         },
    //     }
    // }

    // return outputs
    // /*
    //  "rollup": "2.56.3",
    // */
    // // rollup

    // ///
    // // const compiler = webpack({
    // //     mode: 'production',
    // //     entry: '/home/web/app/main.js',
    // //     output: {
    // //         path: `/home/web/app/build/`,
    // //         filename: 'bundle.js',
    // //     },
    // //     resolve: {
    // //         fallback: {
    // //             fs: require.resolve('browserify-fs'),
    // //             path: require.resolve('path-browserify'),
    // //         },
    // //     },
    // //     module: {
    // //         rules: [
    // //             {
    // //                 test: /\.js$/,
    // //                 use: {
    // //                     loader: 'babel-loader',
    // //                     options: {
    // //                         presets: ['@babel/preset-env', '@babel/preset-react'],
    // //                     },
    // //                 },
    // //             },
    // //         ],
    // //     },
    // // })

    // // compiler.inputFileSystem = memfs
    // // compiler.outputFileSystem = memfs

    // // compiler.compile(() => {
    // //     memfs.readFileSync('/home/web/build/bundle.js')
    // // })
    //
}
