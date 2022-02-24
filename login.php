<?php
    $server = "localhost";
    $user = "id18511818_carrera";
    $pssbd = "J-ZmT|6a/L1CAIWQ";
    $db = "id18511818_carreraapp";
    
    $codigo = $_GET['codigo'];
    $pass = $_GET['pass'];
    
    //Crear conexion
    $conn = mysqli_connect($server, $user, $pssbd, $db);
    if (!$conn) {
        echo "Error";
    }
    
    $sql = "SELECT codigo, password FROM corredor where codigo = $codigo";
    
    //ejecucion del query
    
    $result = mysqli_query($conn, $sql);
    //si hay datos los compara y los muestra
    if(mysqli_num_rows($result) > 0) { 
        while($row = mysqli_fetch_assoc($result)) {
            if ($codigo == $row['codigo'] and $pass == $row['password']) {
                echo "Usuario autentificado";
            } else {
                echo "Código o usuario incorrectos. Intenté de nuevo.";
            }
        }
    } else {
        "El usuario ingresado no existe.";
    }
    
    mysqli_close($conn);
    

?>