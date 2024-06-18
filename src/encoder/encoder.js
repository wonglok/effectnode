import { fs, createFsFromVolume, Volume } from 'memfs'
import { webpack } from 'webpack'
import {npmRunCli} from 'npm-in-browser'
export function createBuilder (){ 

    const memfs = createFsFromVolume(new Volume())

    

}
