const Category = require("../models/category");
const Blog = require("../models/blog");

async function populate(){

    const count = await Category.count();

    if(count == 0){
       const categories =  await Category.bulkCreate([
            {name:"Web Geliştirme"},
            {name:"Mobil Geliştirme"},
            {name:"Programlama"}
        ]);

        const blogs =  await Blog.bulkCreate([
            {
                baslik:"Komple Uygulamalı Web Geliştirme Eğitimi",
                altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.Dinamik bir web uygulaması bir yönetim paneline sahiptir ve yönetim paneli ile site içeriklerini dinamik bir şekilde yönetebiliriz.",
                resim:"1.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
        ])
        await categories[0].addBlog(blogs[0]);
        await categories[0].addBlog(blogs[1]);

        await blogs[0].addCategory(categories[1]);

        await categories[0].createBlog({
            baslik:"Yeni Blog ",
            altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
            aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.Dinamik bir web uygulaması bir yönetim paneline sahiptir ve yönetim paneli ile site içeriklerini dinamik bir şekilde yönetebiliriz.",
            resim:"1.jpeg",
            anasayfa:true,
            onay:true,
        })
    }

   
}

module.exports = populate;