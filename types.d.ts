 type BaseComponent={
    id:string,
    attributes:Record<attributesType,string>,
    style:Record<string,string>,
    parent_id:string|null,
}

export type secondaryComponenTypes=
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


 type secondaryComponent={
    type:secondaryComponenTypes,
    content?:never,
    children_id:string[],

}

export type primitiveCompontentTypes= |'p'
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


 type primitiveComponent={
    type:primitiveCompontentTypes,
    children_id?:never,
    content:string,
}

export type Component =BaseComponent & (primitiveComponent | secondaryComponent)

    
export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string; // or Date
  updatedAt: string; // or Date
};
