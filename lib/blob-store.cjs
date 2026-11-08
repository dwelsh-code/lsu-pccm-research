'use strict';
module.exports={
 async read(path){const {get}=await import('@vercel/blob');const result=await get(path,{access:'private',useCache:false});if(!result)return null;if(result.statusCode!==200)throw Error('Storage read failed');return {value:JSON.parse(await new Response(result.stream).text()),etag:result.blob.etag};},
 async write(path,value,etag){const {put}=await import('@vercel/blob');try{await put(path,JSON.stringify(value),{access:'private',addRandomSuffix:false,allowOverwrite:!!etag,...(etag?{ifMatch:etag}:{}),contentType:'application/json',cacheControlMaxAge:0});}catch(error){if(['BlobPreconditionFailedError','BlobAlreadyExistsError'].includes(error.name))error.conflict=true;throw error;}}
};
