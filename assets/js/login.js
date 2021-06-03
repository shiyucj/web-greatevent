$(function(){
    //点击‘去注册账号’的链接
    $('#link-reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击‘去登入账号’的链接
    $('#link-login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //从layui中获取fomr对象
    var form=layui.form
    var layer=layui.layer
    //通过form.verify自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value){
        //通过形参拿到的是确认框中的内容
        //还需要拿到密码框中的内容
        //然后进行一次等于判断
        var pwd= $('.reg-box [name=password]').val()
        if(pwd!==value){
            return '两次密码不一致'
        }
        }
    })

    
    //监听注册表单的提交事件
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        var data={username:$('#form-reg [name=username]').val(),password:$('#form-reg [name=password]').val()}
        $.post('http://api-breakingnews-web.itheima.net/api/reguser',data
        ,function(res){
            if(res.status!==0){
               
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            //模拟点击行为
            $('#link-login').click()
        })
    }) 

    //监听登陆表单的事件
    $('#form-login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'http://api-breakingnews-web.itheima.net/api/login',
            method:'post',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success: function(res){
                if(res.status!=0){
                    return layer.msg(res.message);
                }
                layer.msg('登入成功');
                // console.log(res.token);
                
                //将登入成功得到的taken字符串保存到localStorage中
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href='/index.html'
            }
        })
    })
})