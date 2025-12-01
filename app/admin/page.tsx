"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"
import Navbar from "../components/Navbar";

type Student = Database['public']['Tables']['students']['Row']

export default function AdminPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [stats, setStats] = useState({
    totalStudents: 0,
    maleCount: 0,
    femaleCount: 0,
    recentAdditions: 0
  })

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    calculateStats()
  }, [students])

  async function fetchStudents() {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order('created_at', { ascending: false })

    if (!error && data) {
      setStudents(data)
    }
  }

  function calculateStats() {
    const maleCount = students.filter(s => s.gender === 'male').length
    const femaleCount = students.filter(s => s.gender === 'female').length

    // Students added in last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentAdditions = students.filter(s => {
      if (s.created_at) {
        return new Date(s.created_at) > sevenDaysAgo
      }
      return false
    }).length

    setStats({
      totalStudents: students.length,
      maleCount,
      femaleCount,
      recentAdditions
    })
  }

  return (
    <>
      <Navbar />

      <div className="page-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Monitor and manage your student database</p>
        </div>
      </div>

      <div className="container my-5">
        {/* Statistics Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-3">
            <div className="card fade-in" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <p className="mb-1" style={{fontSize: '0.875rem', opacity: 0.9}}>Total Students</p>
                    <h2 style={{fontSize: '2.5rem', fontWeight: '700', margin: 0}}>{stats.totalStudents}</h2>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                </div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>
                  All registered students
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card fade-in" style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <p className="mb-1" style={{fontSize: '0.875rem', opacity: 0.9}}>Male Students</p>
                    <h2 style={{fontSize: '2.5rem', fontWeight: '700', margin: 0}}>{stats.maleCount}</h2>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>
                  {stats.totalStudents > 0 ? Math.round((stats.maleCount / stats.totalStudents) * 100) : 0}% of total
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card fade-in" style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <p className="mb-1" style={{fontSize: '0.875rem', opacity: 0.9}}>Female Students</p>
                    <h2 style={{fontSize: '2.5rem', fontWeight: '700', margin: 0}}>{stats.femaleCount}</h2>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>
                  {stats.totalStudents > 0 ? Math.round((stats.femaleCount / stats.totalStudents) * 100) : 0}% of total
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card fade-in" style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              border: 'none'
            }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <p className="mb-1" style={{fontSize: '0.875rem', opacity: 0.9}}>This Week</p>
                    <h2 style={{fontSize: '2.5rem', fontWeight: '700', margin: 0}}>{stats.recentAdditions}</h2>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  </div>
                </div>
                <div style={{fontSize: '0.875rem', opacity: 0.9}}>
                  New additions
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gender Distribution Chart */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div className="card fade-in">
              <div className="card-body">
                <h5 className="card-title mb-4" style={{fontSize: '1.25rem', fontWeight: '700', color: '#4f46e5'}}>
                  <svg className="d-inline-block me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                  Gender Distribution
                </h5>
                <div className="mb-4">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{fontWeight: '600'}}>Male</span>
                      <span style={{fontWeight: '600', color: '#4f46e5'}}>{stats.maleCount} ({stats.totalStudents > 0 ? Math.round((stats.maleCount / stats.totalStudents) * 100) : 0}%)</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '12px',
                      background: '#e2e8f0',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${stats.totalStudents > 0 ? (stats.maleCount / stats.totalStudents) * 100 : 0}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{fontWeight: '600'}}>Female</span>
                      <span style={{fontWeight: '600', color: '#10b981'}}>{stats.femaleCount} ({stats.totalStudents > 0 ? Math.round((stats.femaleCount / stats.totalStudents) * 100) : 0}%)</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '12px',
                      background: '#e2e8f0',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${stats.totalStudents > 0 ? (stats.femaleCount / stats.totalStudents) * 100 : 0}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                        transition: 'width 0.5s ease'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card fade-in">
              <div className="card-body">
                <h5 className="card-title mb-4" style={{fontSize: '1.25rem', fontWeight: '700', color: '#4f46e5'}}>
                  <svg className="d-inline-block me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Quick Actions
                </h5>
                <div className="d-grid gap-3">
                  <a href="/" className="btn btn-primary btn-lg">
                    <svg className="d-inline-block me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add New Student
                  </a>
                  <button className="btn btn-success btn-lg" onClick={() => window.location.reload()}>
                    <svg className="d-inline-block me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10"/>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </svg>
                    Refresh Data
                  </button>
                  <a href="/" className="btn btn-outline-primary btn-lg">
                    <svg className="d-inline-block me-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/>
                    </svg>
                    View All Students
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Students */}
        <div className="row">
          <div className="col-12">
            <div className="card fade-in">
              <div className="card-body">
                <h5 className="card-title mb-4" style={{fontSize: '1.25rem', fontWeight: '700', color: '#4f46e5'}}>
                  <svg className="d-inline-block me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                  Recent Students
                </h5>
                {students.length === 0 ? (
                  <div className="text-center py-5">
                    <svg className="mx-auto mb-3" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <h5 style={{color: '#94a3b8'}}>No students yet</h5>
                    <p style={{color: '#cbd5e1'}}>Start by adding your first student</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Gender</th>
                          <th>Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.slice(0, 10).map((student) => (
                          <tr key={student.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    fontWeight: '600'
                                  }}>
                                  {student.name?.charAt(0).toUpperCase()}
                                </div>
                                <strong>{student.name}</strong>
                              </div>
                            </td>
                            <td>{student.email}</td>
                            <td>{student.phone_number}</td>
                            <td>
                              <span className={`badge ${student.gender === 'male' ? 'bg-primary' : 'bg-success'}`}
                                style={{padding: '0.5rem 0.75rem', borderRadius: '6px'}}>
                                {student.gender}
                              </span>
                            </td>
                            <td style={{color: '#64748b', fontSize: '0.875rem'}}>
                              {student.created_at ? new Date(student.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {students.length > 10 && (
                  <div className="text-center mt-3">
                    <a href="/" className="btn btn-outline-primary">
                      View All {students.length} Students
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
