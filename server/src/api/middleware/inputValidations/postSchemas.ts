import Joi from 'joi'

const attachment = Joi.object({

   id: Joi.string().required(),
   type: Joi.string().required()

})

export const deleteSchema = Joi.object({

    post_id: Joi.string().required()
})

export const createSchema = Joi.object({
    replied_post_id: Joi.alternatives().try(Joi.string().allow(null), null).required(),
    body: Joi.string().when('attachments', {
        is: Joi.array().min(1).required(),
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional()
    }),
    /*
    attachments: Joi.array().items(attachment).when('body', {
        is: Joi.string().min(1).required(),
        then: Joi.array().items(attachment).required(),
        otherwise: Joi.array().items(attachment).default([])
    }),
    */
    attachments: Joi.array().default([]),
    topic: Joi.string().required(),
    title: Joi.alternatives().try(Joi.string().allow(null), null).required()

}).without('body', 'attachments')


export const editSchema = Joi.object({
   
    post_id: Joi.string().required(),
    new_body: Joi.string().when('removed_attachments', {
        is: Joi.array().min(1).required(),
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional()
    }),
    removed_attachments: Joi.array().items(Joi.string()).default([])

}).without('new_body', 'removed_attachments')

export const bridgeSchema = Joi.object({
    
    to_thread_id: Joi.string().required(),
    to_post_id: Joi.string().required(),
    from_thread_id: Joi.string().required(),
    from_post_id: Joi.string().required(),

})