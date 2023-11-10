const Category = require("../models/category");
const Blog = require("../models/blog");
const slugField = require("../helpers/slugfield");


async function populate(){

    const count = await Category.count();

    if(count == 0){
       const categories =  await Category.bulkCreate([
            {name:"Web Geliştirme", url:slugField("Web Geliştirme")},
            {name:"Mobil Geliştirme", url:slugField("Mobil Geliştirme")},
            {name:"Programlama", url:slugField("Programlama")}
        ]);

        const blogs =  await Blog.bulkCreate([
            {
                baslik:"Komple Uygulamalı Web Geliştirme Eğitimi",
                url:slugField("Komple Uygulamalı Web Geliştirme Eğitimi"),
                altbaslik:"Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
                aciklama:"Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.Dinamik bir web uygulaması bir yönetim paneline sahiptir ve yönetim paneli ile site içeriklerini dinamik bir şekilde yönetebiliriz.",
                resim:"1.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
            {
                baslik:"Python ile Sıfırdan İleri Seviye Python Programlama",
                url:slugField("Python ile Sıfırdan İleri Seviye Python Programlama"),
                altbaslik:"Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
                aciklama:"Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
                resim:"2.jpeg",
                anasayfa:true,
                onay:true,
            },
        ])
        await categories[0].addBlog(blogs[0]);
        await categories[0].addBlog(blogs[1]);
        await categories[0].addBlog(blogs[2]);
        await categories[0].addBlog(blogs[3]);
        await categories[0].addBlog(blogs[4]);
        await categories[0].addBlog(blogs[5]);
        await categories[0].addBlog(blogs[6]);
        await categories[0].addBlog(blogs[7]);
        await categories[0].addBlog(blogs[8]);
        await categories[0].addBlog(blogs[9]);

        await blogs[0].addCategory(categories[1]);
    }

   
}

module.exports = populate;