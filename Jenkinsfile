def secret = 'RiziqStankovic'
def server = 'fasha@103.189.234.200'
def dir = '/home/fasha/literature-frontend'
def branch = 'production'
def images = 'ziq02/literature-fe01:v1'

pipeline{
        agent any
        stages{
                stage ('Delete container and images & git pull'){
                        steps{
                                sshagent([secret]) {
                                        sh """ssh -o StrictHostKeyChecking=no ${server} << EOF
                                        cd ${dir}
                                        #docker-compose down
                                        #docker system prune -f
                                        git pull origin1 ${branch}
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
                                        #docker build -t ${images} .
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
        stage ('Send Notification'){
                        steps{
                                discordSend description: 'Frontend Pipeline Succesfull', footer: '', image: '', link: '', result: '', scmWebUrl: '', thumbnail: '', title: 'Jenkins Notif',
                                webhookURL: 'https://discord.com/api/webhooks/1024839606530756639/cDLiwRvd7ESHE1BEk0hEJkUXhnBDximF08i5GbthGZMXmgaKJp8m1VXppUNQUpL0s0Zc'
				}
			}
        }

}
