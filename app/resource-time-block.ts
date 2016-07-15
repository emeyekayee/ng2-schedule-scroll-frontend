// Interface for a_time_block
export interface ResourceTimeBlock {
  rsrc: any,
  blk: any
}

export interface GeoHash {
  left: number,
  width: number,
  right: number
}

export interface StyleHash {
  left: string,
  width: string,
  background?: string
}

export interface Meta {
  t1: number,
  t2: number,
  visible_time?: number
}

export interface ResponseData {
  meta: Meta
}

export interface ResourceSpec {
  tag: string,
  title: string,
  label: string
}
