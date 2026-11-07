export type Language =
	| 'c'
	| 'cpp'
	| 'c/cpp'
// | 'java'

interface ProjectConfig {
	name: string,
	version: string,
	lang: Language,
	standard: string
}

export interface Target {
	name: string
	type:
	| 'executable'
	| 'static_lib'
	| 'dynamic_lib'

	source: string | string[]
	dep?: Library[]
	include?: string[]
	flags?: string[]

}

export interface Library {
	name: string
	type:
	| 'local'
	| 'global'
	| 'remote'

	path: string
}

export class Project {
	private config: ProjectConfig
	private outpath: string
	private target: Target[]

	constructor(config: ProjectConfig) {
		this.config = config
		this.outpath = '.'
		this.target = new Array<Target>()
	}

	public setOutPath(path: string) {
		this.outpath = path
	}

	public addTarget(t: Target) {
		this.target.push(t)
	}
}

export function isLibrary(value: unknown): value is Library {
	if ((typeof value != 'object') || (value == null)) return false

	if (!
		(('name' in value) && (typeof value.name == 'string')) ||
		(('path' in value) && (typeof value.path == 'string'))
	) return false

	if (!(('type' in value) && (typeof value.type == 'string'))) return false
	if (!(
		(value.type == 'local') ||
		(value.type == 'global') ||
		(value.type == 'remote')
	)) return false

	return true
}
