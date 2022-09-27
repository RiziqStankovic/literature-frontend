def secret = 'riziq'
def server = 'cicds@103.189.235.96'
def dir = 'literature-frontend'
def branch = 'production'

pipeline{
        agent any
        stages{
                stage ('Delete container and images & git pull'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=yes ${server} << EOF
                                        cd ${dir}
                                        docker-compose down
                                        docker system prune -f
                                        git pull origin ${branch}
                                        exit
                                        EOF"""
                                }
                        }
                }
        stage ('Build Images'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
                                        docker-compose build
                                        exit
                                        EOF"""
                                }
                        }
                }
        stage ('Create Container with compose'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
                                         docker-compose up -d
                                        exit
                                        EOF"""
                                }

                        }

               }

        }

}
