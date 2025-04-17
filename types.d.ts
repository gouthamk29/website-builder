 type BaseComponent={
    id:string,
    attributes:Record<attributesType,string>,
    style:Record<string,string>,
    
}

type secondaryComponenTypes={
    type:
    | 'div'
    | 'section'
    | 'header'
    | 'footer'
    | 'aside'
    | 'main'
    | 'article'
    | 'nav'
    | 'ul'
    | 'ol'
    | 'li'
    | 'form'
    | 'fieldset'
    | 'legend'
    | 'table'
    | 'thead'
    | 'tbody'
    | 'tr'
    | 'td'
    | 'th'
    | 'label'
    | 'select'
    | 'option';
}

 type secondaryComponen={
    type:secondaryComponenTypes,
    content?:never,
    children_id:string[],

}

type primitiveCompontentTypes={
    type: |'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'img'
    | 'button'
    | 'input'
    | 'label'
    | 'textarea'
    | 'a'
    | 'small'
    | 'strong'
    | 'em'
    | 'b'
    | 'i'
    | 'u'
    | 'code'
    | 'pre'
    | 'svg'
    | 'video'
    | 'audio'
    | 'hr'
    | 'br';
}

 type primitiveComponent={
    type:primitiveCompontentTypes,
    children_id?:never,
    content:string,
}

export type Component = primitiveComponent | secondaryComponent


