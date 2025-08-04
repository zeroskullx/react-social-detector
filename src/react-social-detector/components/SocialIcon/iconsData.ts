import iconsDB from './db.json'

type IconDBSchema = {
	color: string
	path: string
	viewBox: string
}

export type IconDBKeys = keyof typeof iconsDB

type IconDB = Record<IconDBKeys, IconDBSchema>

export const iconsData = iconsDB as IconDB
