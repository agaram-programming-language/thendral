தென்றல் - js ஸ்கிரிப்டிங் மொழி [[demo](https://agaram-programming-language.github.io/)]

Thendral - Thendral transpiles tamil to valid javascript 

### Function declaration
Thendral
```
செயல்பாடு கூட்டல்(அ,ஆ) {
 திருப்பு அ + ஆ 
}
 எழுது கூட்டல்(1,2)
```

Translated Js Code
```
function கூட்டல்(அ, ஆ) {
    return அ + ஆ
}
thendralPrint(கூட்டல்(1, 2))
```

### While Loop

Thendral
```
நிலையற்ற a = 2
இருப்பின்வளையம்(a < 10) {
 a = a + 2 
 எழுது a 
}
```

Translated Js Code

```
var a = 2
while (a < 10) {
    a = a + 2
}
thendralPrint(a)
```



