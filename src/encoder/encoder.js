import { fs, createFsFromVolume, Volume } from 'memfs'
import { webpack } from 'webpack'
import { runNpmCli } from 'npm-in-browser'
export async function createBuilder() {
    const memfs = createFsFromVolume(new Volume())

    await runNpmCli(['install', 'react'], {
        fs: memfs,
        cwd: '/home/web/app',
        stdout: (chunk) => {
            console.log('stdout', chunk)
        },
        stderr: (chunk) => {
            console.log('stderr', chunk)
        },
        timings: {
            start(name) {
                console.log('START: ' + name)
            },
            end(name) {
                console.log('END: ' + name)
            },
        },
    })

    const reactPkgJson = memfs.readFileSync('/home/web/app/node_modules/react/package.json', 'utf-8')
    console.log({ reactPkgJson })

    const code = `
        console.log(123, 'yo')
    `
    //Creating our entry file with the user-submitted code
    memfs.writeFileSync('/home/web/app/temp.js', code)

    const compiler = webpack({
        mode: 'production',
        entry: '/home/web/app/temp.js',
        output: {
            path: `/home/web/build/`,
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                },
            ],
        },
    })

    compiler.inputFileSystem = memfs
    compiler.outputFileSystem = memfs

    compiler.compile(() => {
        memfs.readFileSync('./')
    })

    //
}
