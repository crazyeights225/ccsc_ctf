<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>lolgamez</title>
    <!-- Bulma Version 0.9.0-->
    <link rel="stylesheet" href="bulma.min.css" />
    <style>body{background-color: #00c2fc!important;}</style>
</head>

<body>
    <section class="hero is-info is-fullheight">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="../">
                            <img src="logo.png" alt="Logo">
                        </a>
                        <span class="navbar-burger burger" data-target="navbarMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarMenu" class="navbar-menu">
                        <div class="navbar-end">
                            <span class="navbar-item">
                                <a style="color:white!important;" href="index.html">Home
                                </a>
                            </span>
                             <span class="navbar-item">
                                <a style="color:white!important;" href="about.html">About Us
                                </a>
                            </span>
                             <span class="navbar-item">
                                <a style="color:white!important;" href="about.html">Contact
                                </a>
                            </span>
                             <span class="navbar-item">
                                <a style="color:white!important;" href="#">Staff
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            </div>

            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-6 is-offset-3">
                        <h1 class="title">
                            L0LGam3z
                        </h1>
                        <h2 class="subtitle">
                            Employee Records
                        </h2>
                       
                        <div class="box">
                        <form method="GET" action="staff.php">
                         <label>Search:</label>
                         <input name="id">
                         <input type="submit" class="button is-link is-rounded" value="submit">
                        </form>
                        </div>
                        <div class="box">
                        <?php
                            $query = "SELECT * FROM employees";
                            if(isset($_GET['id'])){
                                $eid = $_GET['id'];
                                $query = "SELECT * FROM employees WHERE id='$eid'";
                            }
                            session_start();
                            require_once "./functions/database_functions.php";
                            $conn = db_connect();

                            $result = mysqli_query($conn, $query);
                        ?>
                        <table class="table is-fullwidth">
                        <tr>
                            <th>Name</th>
                            <th>Role</th>            
                        </tr>
                        <?php while($row = mysqli_fetch_assoc($result)){ ?>
		                <tr>
			            <td><?php echo $row['full_name']; ?></td>
                        <td><?php echo $row['position']; ?></td>
                        </tr>
                        <?php } ?>
                        </table>
                        <?php
                            if(isset($conn)) {mysqli_close($conn);}
                        ?>
                    </div>
                    </div>
                </div>
            </div>

    </section>
</body>
</html>
  
