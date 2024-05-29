const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {

    try{

        const tensor = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
     
      const prediction = model.predict(tensor);
      const score = await prediction.data();
      const confidenceScore = Math.max(...score) * 100;
      
      let label,result,suggestion;
      const classes = ['Cancer','Non-cancer']
      if(confidenceScore> 50){
          label = classes[0]
      }else{
          label = classes[1]
      }
  
      if(label === 'Cancer'){
          result = 'Cancer';
          suggestion = 'Segera periksa ke dokter!';
      }
  
      if(label === 'Non-cancer'){
          result = 'Non-cancer';
          suggestion = 'Tidak terindikasi kanker';
  
      }
  
  
      return {result,suggestion}

    }catch(error){
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`)

    }

  }

  module.exports = predictClassification;
